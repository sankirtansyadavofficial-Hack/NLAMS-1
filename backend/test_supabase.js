require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function testSupabase() {
  try {
    // Test 1: Basic connection
    const res1 = await pool.query('SELECT NOW() AS current_time');
    console.log('✅ Test 1 — Connection OK:', res1.rows[0].current_time);

    // Test 2: Check PostGIS extension
    const res2 = await pool.query("SELECT extname, extversion FROM pg_extension WHERE extname = 'postgis'");
    if (res2.rows.length > 0) {
      console.log('✅ Test 2 — PostGIS enabled, version:', res2.rows[0].extversion);
    } else {
      console.log('⚠️  Test 2 — PostGIS NOT enabled yet (will be enabled when you run seedData.js)');
    }

    // Test 3: Check if land_parcels table exists
    const res3 = await pool.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'land_parcels')");
    if (res3.rows[0].exists) {
      console.log('✅ Test 3 — land_parcels table exists');
      // Test 4: Count rows
      const res4 = await pool.query('SELECT COUNT(*) FROM land_parcels');
      console.log('✅ Test 4 — Rows in land_parcels:', res4.rows[0].count);
    } else {
      console.log('⚠️  Test 3 — land_parcels table does NOT exist yet (run seedData.js to create it)');
    }

    // Test 5: Write + Read test
    await pool.query("CREATE TABLE IF NOT EXISTS _health_check (id SERIAL PRIMARY KEY, msg TEXT, created_at TIMESTAMPTZ DEFAULT NOW())");
    await pool.query("INSERT INTO _health_check (msg) VALUES ('Supabase is alive!')");
    const res5 = await pool.query("SELECT * FROM _health_check ORDER BY id DESC LIMIT 1");
    console.log('✅ Test 5 — Write/Read OK:', res5.rows[0].msg);
    await pool.query("DROP TABLE _health_check");

    console.log('\n🎉 ALL TESTS PASSED — Supabase is working perfectly!');
  } catch (err) {
    console.error('❌ TEST FAILED:', err.message);
  } finally {
    await pool.end();
  }
}

testSupabase();

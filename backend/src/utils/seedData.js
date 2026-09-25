const pool = require('../config/db');

// ─── Realistic Indian Land Parcels Seed Data ─────────────────────────────────
// Parcels based on real villages in Pune district (NH-48 corridor)
// Coordinates near actual locations along NH-48 between Pune and Satara

async function seedData() {
  try {
    const client = await pool.connect();

    // Enable PostGIS extension for GIS mapping
    await client.query('CREATE EXTENSION IF NOT EXISTS postgis;');

    // Drop and recreate table with new fields
    await client.query('DROP TABLE IF EXISTS land_parcels;');
    await client.query(`
      CREATE TABLE land_parcels (
        id SERIAL PRIMARY KEY,
        plot_number VARCHAR(50) UNIQUE,
        khasra_number VARCHAR(50),
        khata_number VARCHAR(50),
        mutation_status VARCHAR(50),
        owner_name VARCHAR(100),
        owner_phone VARCHAR(20),
        owner_aadhaar VARCHAR(20),
        owner_address TEXT,
        parcel_area FLOAT,
        valuation FLOAT,
        usage VARCHAR(100),
        owner_color VARCHAR(20),
        latitude FLOAT,
        longitude FLOAT,
        geom GEOMETRY(Polygon, 4326)
      );
    `);
    console.log('✅ Recreated land_parcels table with PostGIS and new fields (Khasra, Khata, Mutation).');

    // Realistic parcels with new details
    const parcels = [
      // ─── Mandawali / Haveli Tehsil (Pune East) ─────────────────────
      { plot: 'MH/PUN/MND/247-B', khasra: '142/1', khata: '891', mutation: 'Completed', owner: 'Ramesh Patel', phone: '+91 98765 43210', aadhaar: 'XXXX-XXXX-4523', addr: 'H.No. 12, Mandawali, Haveli, Pune, Maharashtra', area: 3.2, val: 4850000, usage: 'Residential', color: '#3b82f6', lat: 18.5362, lng: 73.8478, offset: [0.001, -0.0005, 0.0008, 0] },
      { plot: 'MH/PUN/MND/248-A', khasra: '142/2', khata: '892', mutation: 'Pending', owner: 'Suresh Jadhav', phone: '+91 94220 18734', aadhaar: 'XXXX-XXXX-7891', addr: 'Gram Panchayat Road, Mandawali, Haveli, Pune, Maharashtra', area: 2.8, val: 4200000, usage: 'Commercial', color: '#ef4444', lat: 18.5375, lng: 73.8495, offset: [-0.001, 0.002, 0.001, -0.001] },
      { plot: 'MH/PUN/MND/249-C', khasra: '145', khata: '433', mutation: 'Completed', owner: 'Govind Shinde', phone: '+91 88050 23456', aadhaar: 'XXXX-XXXX-3345', addr: 'Near Hanuman Mandir, Mandawali, Haveli, Pune, Maharashtra', area: 4.5, val: 6750000, usage: 'Residential', color: '#3b82f6', lat: 18.5388, lng: 73.8462, offset: [0.002, 0.001, -0.001, 0.0015] },
      { plot: 'MH/PUN/MND/250-D', khasra: '150/A', khata: '102', mutation: 'Completed', owner: 'Anita Deshmukh', phone: '+91 97635 12890', aadhaar: 'XXXX-XXXX-5567', addr: 'Plot 45, Mandawali, Haveli, Pune, Maharashtra', area: 1.5, val: 3200000, usage: 'Residential', color: '#3b82f6', lat: 18.5350, lng: 73.8490, offset: [-0.0005, -0.0005, 0.0005, 0.0005] },

      // ─── Undri / Pisoli (Pune South) ───────────────────────────────
      { plot: 'MH/PUN/UND/101-A', khasra: '12', khata: '55', mutation: 'Completed', owner: 'Rajendra Kulkarni', phone: '+91 99225 67890', aadhaar: 'XXXX-XXXX-2234', addr: 'Survey No. 101, Undri, Haveli, Pune, Maharashtra', area: 5.0, val: 12500000, usage: 'Agriculture', color: '#f59e0b', lat: 18.4615, lng: 73.9050, offset: [0.001, -0.001, 0.002, 0] },
      { plot: 'MH/PUN/UND/102-B', khasra: '14', khata: '78', mutation: 'Under Dispute', owner: 'Pratap Bhosle', phone: '+91 98908 45678', aadhaar: 'XXXX-XXXX-8812', addr: 'Undri–Pisoli Road, Undri, Haveli, Pune, Maharashtra', area: 3.8, val: 9500000, usage: 'Commercial', color: '#ef4444', lat: 18.4628, lng: 73.9068, offset: [-0.0015, 0.001, -0.0005, 0.0015] },
      { plot: 'MH/PUN/PIS/103-C', khasra: '32', khata: '110', mutation: 'Completed', owner: 'Sanjay Gaikwad', phone: '+91 87880 34567', aadhaar: 'XXXX-XXXX-1190', addr: 'Pisoli Gaon, Haveli, Pune, Maharashtra', area: 6.2, val: 8680000, usage: 'Agriculture', color: '#10b981', lat: 18.4600, lng: 73.9035, offset: [0.002, -0.002, 0.001, 0.001] },

      // ─── Hinjawadi / Mulshi Tehsil (Pune West) ─────────────────────
      { plot: 'MH/PUN/HIN/301-A', khasra: '201/1', khata: '501', mutation: 'Completed', owner: 'Vikram Thorat', phone: '+91 90280 56789', aadhaar: 'XXXX-XXXX-6678', addr: 'Near IT Park Phase 3, Hinjawadi, Mulshi, Pune, Maharashtra', area: 2.1, val: 18900000, usage: 'Commercial', color: '#ef4444', lat: 18.5912, lng: 73.7389, offset: [-0.0008, -0.0008, 0.0008, 0.0008] },
      { plot: 'MH/PUN/HIN/302-B', khasra: '205', khata: '510', mutation: 'Completed', owner: 'Lata Pawar', phone: '+91 93710 89012', aadhaar: 'XXXX-XXXX-9945', addr: 'Maan Village Road, Hinjawadi, Mulshi, Pune, Maharashtra', area: 3.6, val: 14400000, usage: 'Agriculture', color: '#f59e0b', lat: 18.5925, lng: 73.7410, offset: [0.0015, 0.0005, -0.001, 0.001] },
      { plot: 'MH/PUN/MUL/303-C', khasra: '45/B', khata: '22', mutation: 'Pending', owner: 'Dattatray Kadam', phone: '+91 81490 12345', aadhaar: 'XXXX-XXXX-3301', addr: 'Pirangut, Mulshi, Pune, Maharashtra', area: 8.0, val: 11200000, usage: 'Agriculture', color: '#10b981', lat: 18.5890, lng: 73.7370, offset: [-0.002, 0.0015, 0.002, -0.001] },

      // ─── Baramati Tehsil ───────────────────────────────────────────
      { plot: 'MH/PUN/BAR/401-A', khasra: '78', khata: '40', mutation: 'Completed', owner: 'Mahadeo Patil', phone: '+91 77730 23456', aadhaar: 'XXXX-XXXX-4412', addr: 'Malegaon, Baramati, Pune, Maharashtra', area: 10.5, val: 6300000, usage: 'Agriculture', color: '#f59e0b', lat: 18.1515, lng: 74.5771, offset: [0.003, -0.001, 0.002, 0.002] },
      { plot: 'MH/PUN/BAR/402-B', khasra: '82/2', khata: '45', mutation: 'Completed', owner: 'Sunita More', phone: '+91 70280 67890', aadhaar: 'XXXX-XXXX-7756', addr: 'Katewadi, Baramati, Pune, Maharashtra', area: 7.2, val: 4320000, usage: 'Agriculture', color: '#10b981', lat: 18.1530, lng: 74.5790, offset: [-0.002, 0.002, -0.001, 0.001] },

      // ─── Shirur Tehsil ─────────────────────────────────────────────
      { plot: 'MH/PUN/SHR/501-A', khasra: '110', khata: '304', mutation: 'Completed', owner: 'Kisan Dhere', phone: '+91 96050 78901', aadhaar: 'XXXX-XXXX-2289', addr: 'Koregaon Bhima, Shirur, Pune, Maharashtra', area: 4.8, val: 3840000, usage: 'Agriculture', color: '#f59e0b', lat: 18.6455, lng: 74.0598, offset: [0.001, -0.0015, 0.001, 0.001] },
      { plot: 'MH/PUN/SHR/502-B', khasra: '115', khata: '310', mutation: 'Completed', owner: 'Ashok Waghmare', phone: '+91 88600 90123', aadhaar: 'XXXX-XXXX-5534', addr: 'Takali Haji, Shirur, Pune, Maharashtra', area: 6.0, val: 4800000, usage: 'Agriculture', color: '#10b981', lat: 18.6470, lng: 74.0615, offset: [-0.0015, 0.0015, 0.001, -0.001] },
      { plot: 'MH/PUN/SHR/503-C', khasra: '120/1', khata: '315', mutation: 'Pending', owner: 'Priya Nikam', phone: '+91 70385 01234', aadhaar: 'XXXX-XXXX-8867', addr: 'Ranjangaon, Shirur, Pune, Maharashtra', area: 3.0, val: 7500000, usage: 'Commercial', color: '#ef4444', lat: 18.6440, lng: 74.0580, offset: [0.001, 0.001, -0.001, -0.001] },

      // ─── Khed Tehsil ───────────────────────────────────────────────
      { plot: 'MH/PUN/KHD/601-A', khasra: '50/A', khata: '100', mutation: 'Rejected', owner: 'Balaji Londhe', phone: '+91 92840 12345', aadhaar: 'XXXX-XXXX-1123', addr: 'Chakan MIDC, Khed, Pune, Maharashtra', area: 2.5, val: 15000000, usage: 'Disputed', color: '#ef4444', lat: 18.7610, lng: 73.8621, offset: [-0.0005, -0.001, 0.001, 0.0005] },
      { plot: 'MH/PUN/KHD/602-B', khasra: '55', khata: '105', mutation: 'Completed', owner: 'Rekha Lokhande', phone: '+91 85530 23456', aadhaar: 'XXXX-XXXX-4456', addr: 'Rajgurunagar, Khed, Pune, Maharashtra', area: 5.5, val: 4950000, usage: 'Agriculture', color: '#f59e0b', lat: 18.7625, lng: 73.8640, offset: [0.0015, -0.001, -0.0005, 0.0015] },

      // ─── Maval Tehsil ──────────────────────────────────────────────
      { plot: 'MH/PUN/MVL/701-A', khasra: '20', khata: '45', mutation: 'Completed', owner: 'Ganesh Bhagwat', phone: '+91 78200 34567', aadhaar: 'XXXX-XXXX-7790', addr: 'Talegaon Dabhade, Maval, Pune, Maharashtra', area: 4.0, val: 6000000, usage: 'Agriculture', color: '#f59e0b', lat: 18.7348, lng: 73.6760, offset: [0.001, 0.001, -0.001, -0.001] },
      { plot: 'MH/PUN/MVL/702-B', khasra: 'Gov-1', khata: '0', mutation: 'N/A', owner: 'Nandini Sawant', phone: '+91 99670 45678', aadhaar: 'XXXX-XXXX-0023', addr: 'Lonavala Old Road, Maval, Pune, Maharashtra', area: 12.0, val: 9600000, usage: 'Government', color: '#f97316', lat: 18.7362, lng: 73.6780, offset: [-0.002, -0.002, 0.003, 0.002] },

      // ─── Junnar Tehsil ─────────────────────────────────────────────
      { plot: 'MH/PUN/JUN/801-A', khasra: '333', khata: '670', mutation: 'Completed', owner: 'Tukaram Mhatre', phone: '+91 86980 56789', aadhaar: 'XXXX-XXXX-3356', addr: 'Otur, Junnar, Pune, Maharashtra', area: 15.0, val: 7500000, usage: 'Agriculture', color: '#10b981', lat: 19.2058, lng: 73.8775, offset: [0.003, -0.002, -0.001, 0.004] },
      { plot: 'MH/PUN/JUN/802-B', khasra: '340/2', khata: '675', mutation: 'Completed', owner: 'Savitri Gunjal', phone: '+91 90150 67890', aadhaar: 'XXXX-XXXX-6689', addr: 'Narayangaon, Junnar, Pune, Maharashtra', area: 8.5, val: 5100000, usage: 'Agriculture', color: '#f59e0b', lat: 19.2072, lng: 73.8795, offset: [-0.002, 0.003, 0.001, -0.002] },

      // ─── Ambegaon Tehsil ───────────────────────────────────────────
      { plot: 'MH/PUN/AMB/901-A', khasra: '80', khata: '150', mutation: 'Pending', owner: 'Vishal Jagtap', phone: '+91 73850 78901', aadhaar: 'XXXX-XXXX-9912', addr: 'Manchar, Ambegaon, Pune, Maharashtra', area: 6.8, val: 4760000, usage: 'Agriculture', color: '#f59e0b', lat: 19.0050, lng: 73.9530, offset: [0.001, -0.001, 0.002, 0.001] },
      { plot: 'MH/PUN/AMB/902-B', khasra: '85', khata: '155', mutation: 'Completed', owner: 'Kamala Deshpande', phone: '+91 81240 89012', aadhaar: 'XXXX-XXXX-2245', addr: 'Ghodegaon, Ambegaon, Pune, Maharashtra', area: 9.2, val: 5520000, usage: 'Agriculture', color: '#10b981', lat: 19.0065, lng: 73.9548, offset: [-0.002, 0.001, -0.001, 0.002] },

      // ─── National Demo Plots ───────────────────────────────────────
      { plot: 'UP/LKO/100-A', khasra: 'UP-12', khata: '401', mutation: 'Completed', owner: 'Ravi Sharma', phone: '+91 91234 56780', aadhaar: 'XXXX-XXXX-1020', addr: 'Gomti Nagar, Lucknow, Uttar Pradesh', area: 4.5, val: 8500000, usage: 'Agriculture', color: '#10b981', lat: 26.8467, lng: 80.9462, offset: [0.002, -0.001, 0.001, 0.001] },
      { plot: 'GJ/AMD/200-B', khasra: 'GJ-45', khata: '502', mutation: 'Completed', owner: 'Patel Brothers', phone: '+91 98765 12345', aadhaar: 'XXXX-XXXX-3040', addr: 'SG Highway, Ahmedabad, Gujarat', area: 2.8, val: 15500000, usage: 'Commercial', color: '#3b82f6', lat: 23.0225, lng: 72.5714, offset: [-0.001, 0.001, 0.002, -0.001] },
      { plot: 'KA/BLR/300-C', khasra: 'KA-88', khata: '603', mutation: 'Completed', owner: 'TechPark Ventures', phone: '+91 99887 76655', aadhaar: 'XXXX-XXXX-5060', addr: 'Whitefield, Bangalore, Karnataka', area: 6.2, val: 42000000, usage: 'Residential', color: '#3b82f6', lat: 12.9716, lng: 77.5946, offset: [0.001, 0.002, -0.001, 0.001] },
      { plot: 'DL/NDL/400-D', khasra: 'DL-Gov', khata: '0', mutation: 'N/A', owner: 'CPWD', phone: '+91 11223 34455', aadhaar: 'XXXX-XXXX-0000', addr: 'Central Secretariat, New Delhi', area: 15.0, val: 95000000, usage: 'Government', color: '#f97316', lat: 28.6139, lng: 77.2090, offset: [-0.003, -0.002, 0.003, 0.002] },
      { plot: 'WB/KOL/500-E', khasra: 'WB-99', khata: '704', mutation: 'Rejected', owner: 'Amit Banerjee', phone: '+91 90011 22334', aadhaar: 'XXXX-XXXX-7080', addr: 'Salt Lake City, Kolkata, West Bengal', area: 3.5, val: 11200000, usage: 'Disputed', color: '#ef4444', lat: 22.5726, lng: 88.3639, offset: [0.001, -0.001, 0.001, 0.001] },
    ];

    // Insert each parcel with more irregular polygons
    for (const p of parcels) {
      const lat = p.lat;
      const lng = p.lng;
      // Generate a farm-like wedge shape that doesn't self-intersect
      const w = Math.sqrt(p.area) * 0.0008;
      const h = w * 0.8;
      const o1 = p.offset[0] || 0;
      const o2 = p.offset[1] || 0;
      
      const coords = [
        [lng, lat],                                    // Bottom Left
        [lng + w * 1.5 + o1, lat + o2 * 0.5],          // Bottom Right (extended)
        [lng + w * 2.2 + o1, lat + h + o2],            // Top Far Right (the tail of the wedge)
        [lng + w * 0.8, lat + h * 1.3],                // Top Right (inner)
        [lng - w * 0.2, lat + h * 0.7],                // Top Left
        [lng, lat]                                     // Close polygon
      ];

      await client.query(`
        INSERT INTO land_parcels (plot_number, khasra_number, khata_number, mutation_status, owner_name, owner_phone, owner_aadhaar, owner_address, parcel_area, valuation, usage, owner_color, latitude, longitude, geom)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, ST_SetSRID(ST_GeomFromGeoJSON($15), 4326))
      `, [
        p.plot, p.khasra, p.khata, p.mutation, p.owner, p.phone, p.aadhaar, p.addr,
        p.area, p.val, p.usage, p.color,
        lat + h / 2, lng + w / 2,
        JSON.stringify({ type: 'Polygon', coordinates: [coords] })
      ]);
    }

    console.log(`✅ Successfully seeded ${parcels.length} realistic land parcels with Khasra & Mutation details!`);
    client.release();
    process.exit(0);

  } catch (err) {
    console.error('❌ Error seeding data:', err.message);
    process.exit(1);
  }
}

seedData();

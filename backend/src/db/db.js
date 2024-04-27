const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
// });

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

// module.exports = {
//   query: (text, params) => pool.query(text, params),
//   end: () => pool.end(),
// };

module.exports = pool;

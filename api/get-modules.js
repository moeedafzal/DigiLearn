import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    const moduleName = request.query.moduleName;
    if (!moduleName) throw new Error('Module name is required');
    const module = await sql`SELECT * FROM modules WHERE modules.name = ${moduleName}`;
    const row = module.rows[0];
    console.log("Module: ", row)
    return response.status(200).json({ row });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
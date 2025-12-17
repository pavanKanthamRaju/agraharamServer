// supabasedb.js (The Adapter)

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; 

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase credentials in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
});

// Helper function to safely replace $1, $2 with actual values.
// This is required because the RPC does not natively handle parameterized queries.
const substituteParams = (text, params) => {
    let finalQuery = text;
    
    params.forEach((param, index) => {
        const placeholder = new RegExp(`\\$${index + 1}`, 'g');
        let value;

        if (param === null || param === undefined) {
            value = 'NULL';
        } else if (typeof param === 'string') {
            // Escape single quotes for SQL safety and wrap in quotes
            value = `'${param.replace(/'/g, "''")}'`;
        } else if (typeof param === 'boolean') {
            value = param ? 'TRUE' : 'FALSE';
        } else {
            // Numbers, etc., are inserted directly
            value = param;
        }
        
        finalQuery = finalQuery.replace(placeholder, value);
    });

    return finalQuery;
};


const supabaseAdapter = {
    // Mimics pool.query(text, values)
    query: async (text, values = []) => {
        // 1. Substitute parameters (remains the same)

        // 1. Clean the text string first
const cleanedText = text.trim(); // <-- ADD THIS LINE

// 2. Substitute parameters using the cleaned string
const rawSql = substituteParams(cleanedText, values);
        // const rawSql = substituteParams(text, values);
    
        // 2. Execute the raw SQL via the custom RPC function (remains the same)
        const { data, error } = await supabase.rpc('execute_sql', {
            sql_query: rawSql
        });
    
        if (error) {
            console.error("Supabase Adapter Error executing RPC:", error);
            throw error;
        }
    
        // --- 3. ROBUST EXTRACTION LOGIC ---
        
        // Handle cases where the RPC returns an empty or null set immediately
        if (!data || data.length === 0) {
            return { rows: [], rowCount: 0 };
        }
        
        // The RPC response returns an array like: [ { execute_sql: { ...row data... } }, ... ]
        const extractedRows = data;
        console.log("supabase data "+data.length)
        return { 
            rows: extractedRows, 
            rowCount: extractedRows.length 
        };
    },
    // Allows access to the native Supabase client if needed for other operations
    native: supabase, 
    insert: async (table, data) => {
        console.log("payload is.."+JSON.stringify(data));
        const { data: result, error } = await supabase
          .from(table)
          .insert([data])
          .select()
          .single();
    
        if (error) throw new Error(JSON.stringify(error));
        return result;
      },
      update: async (table, id, data) => {
        console.log("Updating table:", table, "ID:", id);
        console.log("Payload is.." + JSON.stringify(data));
    
        const { data: result, error } = await supabase
          .from(table)
          .update(data)    // Correct method for modifying existing rows
          .eq('id', id)    // Essential filter to target the specific record
          .select()        // Returns the updated record
          .single();       // Ensures the result is an object, not an array
    
        if (error) {
            console.error("Supabase Update Error:", error);
            throw new Error(JSON.stringify(error));
        }
    
        return result;
    },
    delete: async (table, id) => {
        console.log("Deleting table:", table, "ID:", id);
        
        const { data: result, error } = await supabase
          .from(table)
          .delete()
          .eq('id', id)
          .select(); // Remove .single() to avoid the JSON error
    
        if (error) {
            console.error("Supabase Delete Error:", error);
            throw new Error(`Delete Error: ${JSON.stringify(error)}`);
        }
        
        // If result is empty (length 0), return null. 
        // Otherwise, return the deleted object.
        return result && result.length > 0 ? result[0] : null;
      
};

module.exports = supabaseAdapter;
import { createClient } from "@supabase/supabase-js";
import type { Database } from "database.types";

const supabaseUrl = process.env.API_URL ?? "https://kdxvwlkigwipegdzgwav.supabase.co";
const supabaseKey = process.env.SERVICE_ROLE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkeHZ3bGtpZ3dpcGVnZHpnd2F2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODgxNTM3MCwiZXhwIjoyMDU0MzkxMzcwfQ.CMup3Y3OqEF586ywVvnte6a2-O4pt7A2qEMJmjh6a3A";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
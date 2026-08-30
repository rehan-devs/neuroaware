import { supabase } from "./supabase";
import { AnswersState } from "@/components/QuestionsSection";

export interface FullSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  answers: AnswersState;
  created_at: string;
}

export async function saveSubmission(
  userInfo: { name: string; email: string; phone: string },
  answers: AnswersState
) {
  const { data, error } = await supabase
    .from("submissions")
    .insert([
      {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone || null,
        answers,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Save error:", error);
    throw error;
  }
  return data as FullSubmission;
}

export async function getSubmissions(): Promise<FullSubmission[]> {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error);
    return [];
  }
  return (data || []) as FullSubmission[];
}

export async function deleteSubmission(id: string) {
  const { error } = await supabase.from("submissions").delete().eq("id", id);
  if (error) console.error("Delete error:", error);
}

export async function deleteAllSubmissions() {
  const { error } = await supabase
    .from("submissions")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) console.error("Clear error:", error);
}
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome {user?.email}</h1>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

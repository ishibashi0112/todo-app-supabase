import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/Layout";
import { supabase } from "../utils/supabase";
import { Task, Notice } from "../types/types";

type StaticProps = {
  tasks: Task[];
  notices: Notice[];
};

const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });
      setTasks(tasks as Task[]);
    };
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: true });
      setNotices(notices as Notice[]);
    };
    getTasks();
    getNotices();
  }, []);
  return (
    <Layout title="CSR">
      <p className="text-bule-500 mb-3">SSG + CSR</p>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className="text-lg font-extrabold">{task.title}</p>
            </li>
          );
        })}
      </ul>
      <ul>
        {notices.map((notice) => {
          return (
            <li key={notice.id}>
              <p className="text-lg font-extrabold">{notice.content}</p>
            </li>
          );
        })}
      </ul>
      <Link href={"/ssr"} prefetch={false}>
        <a className="my-3 text-xs">Link to ssr</a>
      </Link>

      <button className="mb-3 text-xs " onClick={() => router.push("/ssr")}>
        ssr
      </button>
    </Layout>
  );
};

export default Csr;

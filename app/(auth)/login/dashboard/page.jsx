import { Testimonials } from "./_components/Testimonials";
import Projects from "./_components/Projects";
import Logout from "./_components/Logout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <article>
      <Testimonials />
      <Projects />
      <Logout />
    </article>
  );
};

export default Dashboard;

import { redirect } from "next/navigation";
import { db } from "@/db";

export default function SnnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // This needs to be a server action !
    "use server";

    // Check the user's inputs and make sure they're valid
    //able to use this by naming the inputs with given name
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    // Create a new record in the database
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    console.log(snippet);

    // Redirect the uer back to the root route
    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input name="title" className="border rounded p-2 w-full " />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea name="code" className="border rounded p-2 w-full " />
        </div>
        <button className="rounded p-2 bg-blue-200">Create</button>
      </div>
    </form>
  );
}

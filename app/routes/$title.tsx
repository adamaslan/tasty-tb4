import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Note } from "~/models/note.server";
import {
  getNoteListItems } from "~/models/note2.server";
import invariant from "tiny-invariant";

type LoaderData = {
  note: Note;
};


//       logNoteListItems(); maybe add that some where and into the imports
export async function loader({ params }: LoaderArgs) {
  invariant(params.title, "noteTitle not found");

  // const note = await getNoteListItems(params.Title);
  const note = await getNoteListItems();
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ note });
};

export const action: ActionFunction = async ({ params }) => {
  invariant(params.title, "noteTitle not found");

  await deleteNoteByTitle(params.title);

  return redirect("/notes");
};

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  console.log(data);
  return (
    <div>
      <h3 className="text-2xl font-bold">{data.note.title}</h3>
      <p className="py-6">{data.note.body}</p>
      <hr className="my-4" />


      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >

          Delete
        </button>
      </Form>
    </div>
  );
}

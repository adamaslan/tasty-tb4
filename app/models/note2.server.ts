import { supabase } from "./user.server";

export type Note = {
  id: string;
  title: string;
  body: string;
  image: string;
  category: string;
};

export async function getNoteListItems() {
  const { data } = await supabase
    .from("tastytable1")
    .select("id, title");

  return data;
}
// export async function logNoteListItems() {
//   const noteListItems = await getNoteListItems();
//   // @ts-ignore
//   noteListItems.forEach((item) => {
//     console.log(`id: ${item.id}, title: ${item.title}`);
//   });
// }
//
// logNoteListItems();

export async function logNoteListItems() {
  return getNoteListItems()
    .then((noteListItems) => {
      noteListItems?.forEach((item) => {
        console.log(`id: ${item.id}, title: ${item.title}`);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

logNoteListItems()
  .then(() => {
    console.log('Logging of note list items is complete');
  })
  .catch((error) => {
    console.error(error);
  });



logNoteListItems().then(() => {
  console.log('Logging of note list items is complete');
});

export async function createNote({
                                   title,
                                   body,
                                   image,
                                   category,
                                 }: Pick<Note, "body" | "title" | "image" | "category">) {
  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, body, image, category }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function deleteNote({
                                   id,
                                 }: Pick<Note, "id">) {
  const { error } = await supabase
    .from("notes")
    .delete({ returning: "minimal" })
    .match({ id });

  if (!error) {
    return {};
  }

  return null;
}

export async function getNote({
                                id,
                              }: Pick<Note, "id">) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  if (!error) {
    return {
      id: data.id,
      title: data.title,
      body: data.body,
      image: data.image,
      category: data.category,
    };
  }

  return null;
}

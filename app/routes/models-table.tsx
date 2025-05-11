import { json } from "@remix-run/node";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { supabase } from "~/supabase.server";

interface Model {
  id: string;
  name: string;
  type: string;
  parameter_count: number;
  experts: number;
  context_window_tokens: number;
  release_date: string;
}

export const loader = async ({ request }: LoaderArgs) => {
  try {
    const { data, error } = await supabase
      .from('models')
      .select('*')
      .order('release_date', { ascending: false });

    if (error) throw error;
    return json({ models: data as Model[] });

  } catch (error) {
    return json({ error: "Failed to fetch models" }, { status: 500 });
  }
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const model = {
    name: formData.get('name'),
    type: formData.get('type'),
    parameter_count: Number(formData.get('parameter_count')),
    experts: Number(formData.get('experts')),
    context_window_tokens: Number(formData.get('context_window_tokens'))
  };

  // Validation
  const errors: Record<string, string> = {};
  if (!model.name) errors.name = "Name is required";
  if (!model.type) errors.type = "Type is required";
  if (isNaN(model.parameter_count)) errors.parameter_count = "Invalid parameter count";
  if (isNaN(model.experts)) errors.experts = "Invalid experts count";
  if (isNaN(model.context_window_tokens)) errors.context_window_tokens = "Invalid context window";

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  try {
    const { data, error } = await supabase
      .from('models')
      .insert([model])
      .select();

    if (error) throw error;
    return json({ success: true, model: data[0] });

  } catch (error) {
    return json({ error: "Failed to create model" }, { status: 500 });
  }
};

export default function ModelsTable() {
  const { models } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">AI Models</h1>
      
      {/* Add Model Form */}
      <Form method="post" className="mb-8 p-4 bg-gray-100 rounded">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label>Name</label>
            <input name="name" className="w-full p-2" />
            {actionData?.errors?.name && (
              <p className="text-red-500">{actionData.errors.name}</p>
            )}
          </div>

          <div>
            <label>Type</label>
            <input name="type" className="w-full p-2" />
            {actionData?.errors?.type && (
              <p className="text-red-500">{actionData.errors.type}</p>
            )}
          </div>

          {/* Other form fields */}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Model
        </button>
      </Form>

      {/* Models Table */}
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Parameters</th>
            <th>Experts</th>
            <th>Context Window</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {models?.map((model) => (
            <tr key={model.id}>
              <td>{model.name}</td>
              <td>{model.type}</td>
              <td>{model.parameter_count.toLocaleString()}</td>
              <td>{model.experts}</td>
              <td>{model.context_window_tokens.toLocaleString()}</td>
              <td>{new Date(model.release_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
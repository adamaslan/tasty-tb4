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
  const { data } = await supabase
    .from('models')
    .select('*')
    .order('release_date', { ascending: false });

  return json({ models: data as Model[] });
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

  const { data } = await supabase
    .from('models')
    .insert([model])
    .select();

  return json({ success: true, model: data ? data[0] : null });
};

export default function ModelsTable() {
  const data = useLoaderData<typeof loader>();
  const models = 'models' in data ? data.models : [];
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
          </div>

          <div>
            <label>Type</label>
            <input name="type" className="w-full p-2" />
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
        <tbody className="divide-y divide-gray-200">
          {Array.isArray(models) && models.map((model) => (
            <tr key={model.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {model.name || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {model.type || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {model.parameter_count != null ? model.parameter_count.toLocaleString() : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {model.experts != null ? model.experts : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {model.context_window_tokens != null ? model.context_window_tokens.toLocaleString() : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {model.release_date ? new Date(model.release_date).toLocaleDateString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
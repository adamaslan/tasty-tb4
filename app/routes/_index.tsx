// app/routes/_index.tsx
import { typedjson, useTypedLoaderData, useTypedActionData } from 'remix-utils';
import { Form, useTransition } from '@remix-run/react';
import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { supabase } from '~/supabase.server';
import type { Model } from '~/models';

export async function loader({ request }: LoaderArgs) {
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Loader error:', error);
    throw new Response('Failed to load models', { status: 500 });
  }

  return typedjson(data);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);

  try {
    const { data, error } = await supabase
      .from('models')
      .insert({
        name: entries.name.toString(),
        type: entries.type.toString(),
        parameter_count: Number(entries.parameter_count),
        experts: Number(entries.experts),
        context_window_tokens: Number(entries.context_window_tokens),
      })
      .single();

    if (error) throw error;
    return typedjson({ success: true, model: data as Model });
  } catch (error) {
    console.error('Action error:', error);
    return typedjson({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export default function Index() {
  const models = useTypedLoaderData<Model[]>();
  const actionData = useTypedActionData<typeof action>();
  const transition = useTransition();

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Form Section */}
      <section className="mb-12 bg-white shadow-sm rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Register New AI Model</h2>
        <Form method="post" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Fields */}
            {['name', 'type', 'parameter_count', 'experts', 'context_window_tokens'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize mb-2">
                  {field.replace(/_/g, ' ')}
                </label>
                <input
                  name={field}
                  type={field === 'name' || field === 'type' ? 'text' : 'number'}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={transition.state === 'submitting'}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {transition.state === 'submitting' ? 'Submitting...' : 'Add Model'}
          </button>

          {actionData?.success && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
              Model {actionData.model?.name} registered successfully!
            </div>
          )}

          {actionData?.error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              Error: {actionData.error}
            </div>
          )}
        </Form>
      </section>

      {/* Models Table */}
      <section className="bg-white shadow-sm rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Registered Models</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Type', 'Parameters', 'Experts', 'Context Window'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {models.map((model) => (
                <tr key={model.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{model.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{model.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {model.parameter_count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{model.experts}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {model.context_window_tokens.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
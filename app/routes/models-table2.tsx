
// app/routes/models-table.tsx
import { Form, useTransition, Link, useLoaderData, useActionData } from '@remix-run/react';
import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { supabase } from '~/supabase.server';
// import type { Model } from '~/models';

// Loader function
export async function loader({ request }: LoaderArgs) {
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .order('release_date', { ascending: false });

  if (error) {
    console.error('Loader error:', error);
    throw new Response('Failed to load models', { status: 500 });
  }
  // Use json helper
  return json(data ?? []);
}

// Action function
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const type = formData.get('type') as string;
  const parameter_count = parseInt(formData.get('parameter_count') as string, 10);
  const experts = parseInt(formData.get('experts') as string, 10);
  const context_window_tokens = parseInt(formData.get('context_window_tokens') as string, 10);


  // Basic validation (add more robust validation as needed)
  if (!name || !type || isNaN(parameter_count) || isNaN(experts) || isNaN(context_window_tokens)) {
    // Use json helper for error response
    return json({ error: 'Invalid form data' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('models')
    .insert([{ name, type, parameter_count, experts, context_window_tokens }])
    .select(); // Use select() to get the inserted data back

  if (error) {
    console.error('Action error:', error);
    // Use json helper for error response
    return json({ error: 'Failed to register model' }, { status: 500 });
  }

  // Use json helper for success response
  return json(data ? data[0] : null); // Return the newly created model or null
}


export default function ModelsTable() {
  const models = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const transition = useTransition();
  const isSubmitting = transition.state === 'submitting';

  // Add loading state
  const isLoading = transition.state === 'loading';

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Link back to home page */}
      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>

      {/* Form Section */}
      <section className="mb-12 bg-white shadow-sm rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Register New AI Model</h2>
        {/* Display action errors */}
        {actionData?.error && (
          <p className="text-red-500 mb-4">{actionData.error}</p>
        )}
        {/* Display success message (optional) */}
        {actionData && !actionData.error && transition.state === 'idle' && (
           <p className="text-green-500 mb-4">Model registered successfully!</p>
        )}

        <Form method="post" className="space-y-4">
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
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Registering...' : 'Register Model'}
          </button>
        </Form>
      </section>

      {/* Models Table */}
      <section className="bg-white shadow-sm rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">
            Loading models...
          </div>
        ) : (
          <>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Registered Models</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {/* Define table headers */}
                    {['Name', 'Type', 'Parameters', 'Experts', 'Context Window', 'Release Date'].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Array.isArray(models) && models.map((model) => (
                    <tr key={model.id}>
                      {/* Add null checks for all model properties */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {model.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {model.type || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(model.parameter_count ?? 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.experts ?? 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(model.context_window_tokens ?? 0).toLocaleString()}
                      </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {model.release_date ? new Date(model.release_date).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
         {(!Array.isArray(models) || models.length === 0) && (
            <p className="px-6 py-4 text-center text-gray-500">No models registered yet.</p>
          )}
      </section>
    </div>
  );
}

// Add Error Boundary
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded-lg">
      <h2 className="font-bold mb-2">Table Error:</h2>
      <p>{error.message}</p>
    </div>
  );
}
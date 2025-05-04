import { typedjson } from 'remix-utils';
import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { supabase } from '~/supabase.server';
import type { Model } from '~/models';

// Loader function to fetch data from Supabase on the server
export async function loader({ request }: LoaderArgs) {
  const { data, error } = await supabase
    .from('models') // Fetch from the 'models' table
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Loader error:', error);
    // It's good practice to handle errors gracefully
    throw new Response('Failed to load models', { status: 500 });
  }

  // Return the data using typedjson for type safety
  return typedjson(data as Model[]);
}

// React component to display the data
export default function ModelsTablePage() {
  // Use the hook to get data fetched by the loader
  const models = useLoaderData<typeof loader>();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <section className="bg-white shadow-sm rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Registered AI Models</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {/* Define table headers */}
                {['Name', 'Type', 'Parameters', 'Experts', 'Context Window', 'Created At'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Map over the models data to create table rows */}
              {models.map((model) => (
                <tr key={model.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {model.parameter_count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.experts}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {model.context_window_tokens.toLocaleString()}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {model.created_at ? new Date(model.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         {models.length === 0 && (
            <p className="px-6 py-4 text-center text-gray-500">No models found.</p>
          )}
      </section>
    </div>
  );
}
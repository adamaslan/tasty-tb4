import React from 'react';
import { Link } from '@remix-run/react';
import dspyprompt from "../../public/dspyprompt.png";
import type {
  MetaFunction,
} from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "What is RAG (Retrieval-Augmented Generation)?",
    "og:image": dspyprompt,
    "og:title": "What is RAG (Retrieval-Augmented Generation)?",
    "og:description": "Learn about Retrieval-Augmented Generation (RAG), the AI framework that enhances LLM outputs with external knowledge for better accuracy and context.",
    "og:type": "article",
    "twitter:card": "summary_large_image",
    "twitter:title": "What is RAG (Retrieval-Augmented Generation)?",
    "twitter:description": "Learn about Retrieval-Augmented Generation (RAG), the AI framework that enhances LLM outputs with external knowledge for better accuracy and context.",
    "twitter:image": dspyprompt,
    "linkedin:title": "What is RAG (Retrieval-Augmented Generation)?",
    "linkedin:description": "Learn about Retrieval-Augmented Generation (RAG), the AI framework that enhances LLM outputs with external knowledge for better accuracy and context.",
    "linkedin:image": dspyprompt,
    "keywords": "RAG, AI, LLM, Retrieval-Augmented Generation, AI Tutorial, Machine Learning, Natural Language Processing"
  };
};

const RemixPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">What is RAG (Retrieval-Augmented Generation)?</h1>
          <p className="mt-2">Understanding the Framework that Enhances LLM Capabilities</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4">Introduction</h2>
          <p className="mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
            Retrieval-Augmented Generation (RAG) is an AI framework that enhances the outputs of large language models (LLMs) by incorporating information from external sources. It combines the generative capabilities of LLMs with the retrieval capabilities of traditional information retrieval systems. This combination allows RAG to access and reference information outside the LLMs' training data, leading to more accurate, up-to-date, and contextually relevant responses.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4">How RAG Works</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">1. Retrieval</h3>
              <p className="text-lg">A user's query is first used to search an external knowledge base or database.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">2. Augmentation</h3>
              <p className="text-lg">The retrieved relevant information is then integrated into the user's prompt before being sent to the LLM.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">3. Generation</h3>
              <p className="text-lg">The LLM generates a response based on the augmented prompt, incorporating the retrieved context.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4">Benefits of RAG</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">Enhanced Accuracy</h3>
              <p className="text-lg">By accessing external knowledge, RAG can generate more factually correct and up-to-date answers.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">Improved Context</h3>
              <p className="text-lg">RAG allows LLMs to produce responses that are more relevant to the specific user query and context.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">Reduced Need for Fine-Tuning</h3>
              <p className="text-lg">RAG can provide some of the benefits of a custom-trained LLM without the need for extensive training or fine-tuning.</p>
            </div>
          </div>
        </section>

        <p className="text-center text-blue-500 text-lg">
          <Link to="/">Go back to Home</Link>
        </p>
      </main>

      <footer className="bg-gray-200 py-4 text-center">
        <p className="text-sm">&copy; 2025 RAG Guide. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RemixPage;


import React from 'react';
import { Link } from '@remix-run/react';
import dspyprompt from "../../public/dspyprompt.png";
import type {

  MetaFunction,
} from "@remix-run/node";
export const meta: MetaFunction = () => {
  return {
    title: "DSPy 101 Tutorial: Prompting Guide",
    "og:image": dspyprompt,
    "keywords": "DSPy, Python, AI, AI Agent, AI Tutorial, AI Chatbot"};
};
const RemixPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">DSPy 101 Tutorial: Prompting Guide</h1>
          <p className="mt-2">Simplify LLM-powered applications with DSPy.</p>
        </div>
      </header>
      <section className="mb-8">
        <img    className="mx-auto my-auto h-1/2 w-1/2 " src={dspyprompt} alt="DSPy Prompt" />
      </section>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4">Quick Start</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>
{`
import dspy

lm = dspy.LM('ollama_chat/llama3.2:1b', api_base='http://localhost:11434')
dspy.configure(lm=lm)
`}
            </code>
          </pre>
          <p className="mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">This snippet initializes a language model and configures DSPy for use.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4">Defining a Signature</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>
{`
from typing import Literal

class Categorize(dspy.Signature):
    event: str = dspy.InputField()
    category: Literal['Wars and Conflicts', 'Politics'] = dspy.OutputField()
    confidence: float = dspy.OutputField()
`}
            </code>
          </pre>
          <p className="mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">Signatures define input-output structures, making your models more intuitive.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4">Calling the Module</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>
{`
classify = dspy.Predict(Categorize)
classification = classify(event="[YOUR HISTORIC EVENT]")
print(classification)
`}
            </code>
          </pre>
          <p className="mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">Use the <code>Predict</code> module to classify events with ease.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4">Optimizing Prompts</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>
{`
from dspy.teleprompt import *
tp = dspy.MIPROv2(metric=validate_category, auto="light")
optimized_classify = tp.compile(classify, trainset=trainset)
`}
            </code>
          </pre>
          <p className="mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">Optimize prompts with DSPy’s Teleprompt module for better performance.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4">Saving Optimized Systems</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>
{`
optimized_classify.save("optimized_event_classifier.json")
`}
            </code>
          </pre>
          <p className="mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">Save your optimized classification systems for later use or deployment.</p>
        </section>

        <p className="text-center text-blue-500 text-lg">
          <Link to="/">Go back to Home</Link>
        </p>
      </main>

      <footer className="bg-gray-200 py-4 text-center">
        <p className="text-sm">&copy; 2025 DSPy Guide. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RemixPage;


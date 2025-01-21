import { Link } from "@remix-run/react";
import databricks from "../../public/databricks.png";

export default function Article12() {
  return (
    <div>
      <div className="mx-3 lg:mx-36">
        <h1 className="tracking-light text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl">
         JetBlue Optimizes Databricks LLM Pipelines with DSPy  
        </h1>
        <img
          className="mx-auto my-auto h-1/2 w-1/2"
          src={databricks}
          alt="databricks"
        />
        <div>
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif"> The integration of DSPy and Databricks 
            DSPy is revolutionizing machine learning workflows by introducing self-improving pipelines, simplifying data preparation, and optimizing large language model (LLM) performance.
            Learn how DSPy transforms LLM pipelines and read more in the original Databricks article
            <a href="https://www.databricks.com/blog/optimizing-databricks-llm-pipelines-dspy" className="text-blue-500"> here</a>.
          </p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif font-bold">
            Key Insights from the Databricks Article
          </p>
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
            The Databricks article highlights the groundbreaking nature of DSPy’s pipeline optimization, including:
          </p>
          <ul className="list-disc pl-5 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
            <li>Automated, self-improving pipelines that refine prompts to improve LLM responses.</li>
            <li>Streamlined support for retrieval-augmented generation (RAG) in various workflows.</li>
            <li>Enhanced compatibility with Databricks tools, such as Model Serving and Vector Search.</li>
          </ul>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif font-bold">
            Exploring DSPy Further
          </p>
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
            Released in October 2023, DSPy was developed by researchers in Matei Zaharia’s Stanford lab. It empowers users to build modular systems that optimize LLM workflows and enables automated tuning for downstream performance improvements. For details, read their research paper
            <a href="https://arxiv.org/abs/2310.03714" className="text-blue-500"> here</a>.
          </p>
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
            DSPy allows developers to construct complex LLM pipelines that adapt dynamically to evolving requirements, making traditional manual prompt-tuning redundant. For more on its retrieval capabilities, check out
            <a href="https://dspy.ai" className="text-blue-500"> Five Ways to Do RAG with DSPy</a>.
          </p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
            Developers can seamlessly integrate DSPy with Databricks Marketplace models like Llama 2 70B, enabling faster deployment of pipelines such as customer feedback classification or predictive maintenance chatbots.
          </p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif font-bold">
            In Collaboration with
            <a href="https://www.jetblue.com" className="text-blue-500"> JetBlue</a>
          </p>
          <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
            JetBlue is leveraging DSPy’s self-optimizing pipelines to achieve enhanced efficiency and reduced costs. Their integration highlights DSPy’s role in driving innovation in real-world applications.
          </p>
          <br />
         
            <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif font-bold">JetBlue's Use of Databricks and DSPy</p>
            <ul className="list-disc list-inside">
              <li  className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
                <span className="font-semibold">Improved Control, Dynamic Updates, and Cost Reduction:</span>
                DSPy modularizes complex pipelines, enabling JetBlue to adapt quickly while reducing costs.
              </li>
              <li className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
  <span className="font-semibold">Enhanced Pipeline Flexibility: </span>
  JetBlue updates their pipelines dynamically, ensuring continued optimization without rewriting entire systems.
</li>
<li className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
  <span className="font-semibold">Optimized Resource Allocation: </span>
  DSPy identifies areas for efficiency, helping JetBlue scale their solutions effectively.
</li>

            </ul>
            <p className="text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif">
              JetBlue’s innovative use of DSPy demonstrates its potential to streamline complex ML workflows, adding new opportunities for LLM applications.
            </p>
        
          <br />
          <p className="text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl">
            Go back
            <Link
              to="/"
              className="text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

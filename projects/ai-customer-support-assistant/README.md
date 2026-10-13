# AI Customer-Support Assistant

**[▶ Open the browser demo on GitHub Pages](https://prajjwal-ptl.github.io/prajjwal-portfolio/projects/ai-customer-support-assistant/demo/)**  
If this is the first deployment after adding the demo, GitHub Pages may take a few minutes to publish it. The source file is available in [demo/index.html](demo/index.html).

A beginner-friendly e-commerce support demo built with Python, Streamlit, Sentence Transformers, ChromaDB, and an optional LLM API. The browser demo is a self-contained interface prototype; the Python version below demonstrates the semantic retrieval and optional LLM architecture.

## Browser demo
- Open the live page at the link above after GitHub Pages finishes deploying.
- Try the quick-start scenarios for delivery delay, damaged item, payment problem, angry customer, and prompt-injection handling.
- The browser page uses local keyword rules and a sample FAQ list. It does not call the Python backend or an LLM API.

## Python project features
- Search a 25-entry local FAQ and display the best matches with their source IDs.
- Draft a short, empathetic reply grounded in retrieved policy entries.
- Estimate customer sentiment and set a category and escalation flag.
- Work without an API key using a local fallback and keyword sentiment baseline.
- Detect common prompt-injection phrases and prevent requests to reveal internal instructions.
- Evaluate FAQ retrieval with 20 sample questions.

## Run the Python version locally (Windows)
```bat
py -3.11 -m venv .venv
.venv\Scripts\activate
python -m pip install --upgrade pip
pip install -r requirements.txt
streamlit run app.py
```

The first semantic-search setup may download the `all-MiniLM-L6-v2` model and requires internet. If the model cannot load, the app falls back to keyword retrieval. To run without the LLM, leave `LLM_API_KEY` unset.

Optional API setup:
```bat
copy .env.example .env
notepad .env
```
Add your own `LLM_API_KEY` in `.env`. Never commit that file.

## Evaluate retrieval
```bat
python evaluate.py
```
The script prints whether the expected FAQ ID appears in the top three matches. Its 20 hand-written examples are a small demonstration set, not proof of production accuracy.

## Architecture
```text
Customer message
      |
      v
Safety checks
      |
      v
FAQ retrieval (Sentence Transformers + ChromaDB)
      | if unavailable
      +--> keyword fallback
      |
      v
LLM reply (optional) or local FAQ template
      |
      v
Reply + sentiment + category + escalation
```

## Important limitations
- This is an interview demo, not a production support system.
- FAQ policy content is fictional and should be replaced with the employer's reviewed policies.
- Sentiment uses a simple keyword rule in offline mode.
- Retrieval does not guarantee that a generated answer is correct; a human should review replies.
- Do not enter actual customer personal data or payment credentials.
- The sample 10-day return window is fictional and does not describe a real retailer.

## Next steps
Add reviewed policies and labeled evaluation data, improve confidence calibration, log reviewer feedback with privacy safeguards, and add automated tests for policy grounding and safety.

"""Streamlit interface for the AI Customer-Support Assistant."""
import os
import streamlit as st
from support_core import SupportEngine

st.set_page_config(page_title="AI Customer Support", page_icon="💬", layout="wide")
st.title("💬 AI Customer-Support Assistant")
st.caption("E-commerce support demo · policy-grounded replies · human review for unclear issues")

@st.cache_resource
def get_engine():
    return SupportEngine()

engine = get_engine()
mode = "LLM API enabled (with offline fallback)" if os.getenv("LLM_API_KEY") else "OFFLINE mode — no API key needed"
st.info(f"Response mode: {mode} | Retrieval: {engine.retrieval_mode}")

if "history" not in st.session_state:
    st.session_state.history = []
if "result" not in st.session_state:
    st.session_state.result = None

with st.form("support_form"):
    message = st.text_area("Customer message", height=130,
        placeholder="My order is late and tracking has not updated...")
    submitted = st.form_submit_button("Analyze message", type="primary")

if submitted:
    if not message.strip():
        st.warning("Enter a customer message first.")
    else:
        with st.spinner("Finding relevant policy entries..."):
            st.session_state.result = engine.answer(message.strip())
        st.session_state.history = [message.strip()] + [
            q for q in st.session_state.history if q != message.strip()
        ]
        st.session_state.history = st.session_state.history[:5]

result = st.session_state.result
if result:
    st.caption(f"Path: {result['mode']} | Search: {result['retrieval_mode']}")
    a, b, c, d = st.columns(4)
    a.metric("Policy entries", len(result["matches"]))
    b.markdown("**Suggested reply**")
    b.write(result["reply"])
    c.metric("Sentiment", result["sentiment"].title())
    d.markdown("**Ticket routing**")
    d.write(f"Category: {result['category']}")
    d.write(f"Escalate: {'Yes' if result['escalate'] else 'No'}")
    st.subheader("Relevant policy entries and sources")
    for faq in result["matches"]:
        with st.expander(f"{faq['id']} · {faq['question']} · score {faq['score']:.2f}"):
            st.caption(f"Source: faq.json | Category: {faq['category']}")
            st.write(faq["answer"])
    st.caption("Review suggested replies before sending them to a real customer.")

with st.sidebar:
    st.subheader("Last 5 queries")
    if st.session_state.history:
        for i, query in enumerate(st.session_state.history, 1):
            st.markdown(f"**{i}.** {query}")
    else:
        st.caption("Submitted messages will appear here.")
    st.divider()
    st.caption("Demo only. Do not paste customer personal or payment information.")

"""Measure whether the expected FAQ appears in the top three retrieval results."""
from support_core import SupportEngine

TESTS = [
    ("Where can I check my order status?", "FAQ-01"),
    ("How do I track my shipment?", "FAQ-03"),
    ("Why did my estimated delivery date change?", "FAQ-04"),
    ("Can I update the delivery address before dispatch?", "FAQ-05"),
    ("My delivery is late and tracking has not moved", "FAQ-06"),
    ("Tracking says delivered but my parcel is missing", "FAQ-08"),
    ("What is the return window after delivery?", "FAQ-10"),
    ("The product arrived damaged", "FAQ-11"),
    ("You sent me the wrong item", "FAQ-12"),
    ("One item is missing from my box", "FAQ-13"),
    ("How long until I get a refund for my return?", "FAQ-14"),
    ("My refund status is still pending", "FAQ-15"),
    ("Will the refund go to my original payment method?", "FAQ-16"),
    ("I want to cancel before my order ships", "FAQ-17"),
    ("Can I cancel after the order was dispatched?", "FAQ-18"),
    ("When will cancellation money be refunded?", "FAQ-19"),
    ("My payment was declined", "FAQ-20"),
    ("My payment failed even though money was deducted", "FAQ-21"),
    ("I was charged twice for one order", "FAQ-22"),
    ("Is it safe to share my OTP, PIN or card CVV?", "FAQ-25"),
]

def main():
    engine = SupportEngine()
    hits = 0
    print(f"Retrieval backend: {engine.retrieval_mode}")
    for question, expected in TESTS:
        top_ids = [item["id"] for item in engine.retrieve(question, k=3)]
        hit = expected in top_ids
        hits += int(hit)
        print(f"{'PASS' if hit else 'MISS'} | expected {expected} | top 3: {', '.join(top_ids)}")
    print(f"\nTop-3 recall: {hits}/{len(TESTS)} = {hits / len(TESTS):.0%}")

if __name__ == "__main__":
    main()

from datetime import date, timedelta

from app.services.policy_classifier import classify_policy


def test_policy_within_renewal_window():
    expiration_date = date.today() - timedelta(days=15)

    assert classify_policy(expiration_date) == "renewable"


def test_policy_exactly_30_days_expired():
    expiration_date = date.today() - timedelta(days=30)

    assert classify_policy(expiration_date) == "renewable"


def test_policy_outside_renewal_window():
    expiration_date = date.today() - timedelta(days=31)

    assert classify_policy(expiration_date) == "expired"
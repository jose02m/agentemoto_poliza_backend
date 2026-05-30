from datetime import date


RENEWAL_WINDOW_DAYS = 30


def classify_policy(expiration_date: date) -> str:
    """
    Clasifica una póliza según su fecha de vencimiento.

    Estados:
    - upcoming: vence en los próximos 30 días
    - renewable: venció hace máximo 30 días
    - expired: venció hace más de 30 días
    """

    today = date.today()

    days_difference = (expiration_date - today).days

    # Próximas a vencer
    if 0 <= days_difference <= RENEWAL_WINDOW_DAYS:
        return "upcoming"

    # Ya vencidas
    if expiration_date < today:

        days_overdue = (today - expiration_date).days

        if days_overdue <= RENEWAL_WINDOW_DAYS:
            return "renewable"

        return "expired"

    return "active"
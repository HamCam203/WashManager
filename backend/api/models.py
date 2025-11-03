from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class WashingMachine(models.Model):
    STATUS_CHOICES = [
        ('available', 'Disponible'),
        ('in_use', 'En cours d’utilisation'),
        ('maintenance', 'En maintenance'),
        ('out_of_order', 'Hors service'),
    ]

    MACHINE_TYPE = [
        ('washer', 'Lave-linge'),
        ('dryer', 'Sèche-linge'),
    ]

    # Informations de base
    name = models.CharField(max_length=100, unique=True)
    machine_type = models.CharField(max_length=20, choices=MACHINE_TYPE, default='washer')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')

    # Détails techniques
    capacity_kg = models.DecimalField(max_digits=4, decimal_places=1, help_text="Capacité en kg")
    price_per_cycle = models.DecimalField(max_digits=6, decimal_places=2, help_text="Prix par cycle (€)")
    location = models.CharField(max_length=200, blank=True, help_text="Emplacement dans la laverie (ex: rangée A, machine 3)")

    # Suivi & maintenance
    last_maintenance_date = models.DateField(null=True, blank=True)
    next_maintenance_date = models.DateField(null=True, blank=True)
    usage_count = models.PositiveIntegerField(default=0)
    is_connected = models.BooleanField(default=True, help_text="Indique si la machine envoie des données en ligne")

    # Optionnel : association à un utilisateur si on veut réserver une machine
    current_user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='machines_in_use'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# Generated by Django 4.2 on 2024-12-15 21:09

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, validators=[django.core.validators.MinValueValidator(0.0)])),
                ('image', models.ImageField(blank=True, null=True, upload_to='products/images')),
                ('available', models.CharField(choices=[('Not Available', 'No Disponible'), ('Available', 'Disponible'), ('Soon', 'Proximamente')], max_length=20)),
            ],
        ),
    ]

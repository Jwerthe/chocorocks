# Generated by Django 4.2 on 2024-12-15 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_alter_product_available'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='available',
            field=models.CharField(choices=[('Soon', 'Proximamente'), ('Available', 'Disponible'), ('Not Available', 'No Disponible')], max_length=20),
        ),
    ]

# Generated by Django 4.2 on 2024-12-15 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_alter_product_available'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='available',
            field=models.CharField(choices=[('Soon', 'Proximamente'), ('Not Available', 'No Disponible'), ('Available', 'Disponible')], max_length=20),
        ),
    ]
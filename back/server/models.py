from django.db import models


class Breakdown(models.Model):
    snapshots = models.ManyToManyField('Snapshot',
                                       related_name='breakdowns',
                                       through='OrderedSnapshot')


class OrderedSnapshot(models.Model):
    number = models.PositiveIntegerField()
    breakdown = models.ForeignKey('Breakdown')
    snapshot = models.ForeignKey('Snapshot')


class Snapshot(models.Model):
    url = models.URLField()
    start = models.FloatField(null=True, blank=True)  # null = start from beginning
    end = models.FloatField(null=True, blank=True)  # null = run to end
from rest_framework import serializers

from server.models import Breakdown, Snapshot


class SnapshotSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Snapshot


class BreakdownSerializer(serializers.ModelSerializer):
    snapshots = SnapshotSerialiser(source='breakdowns', many=True)

    class Meta:
        model = Breakdown



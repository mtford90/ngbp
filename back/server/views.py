# Create your views here.
from rest_framework import viewsets

from server.models import Snapshot, Breakdown
from server.serializers import SnapshotSerialiser, BreakdownSerializer


class SnapshotViewSet(viewsets.ModelViewSet):
    queryset = Snapshot.objects.all()
    serializer_class = SnapshotSerialiser


class BreakdownViewSet(viewsets.ModelViewSet):
    queryset = Breakdown.objects.all()
    serializer_class = BreakdownSerializer


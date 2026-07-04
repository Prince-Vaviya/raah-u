import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MapView, { Marker, Polyline } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

// Mock route coordinates for the polyline
const routeCoordinates = [
  { latitude: 51.385, longitude: -0.115 }, // Thornton Rd area
  { latitude: 51.383, longitude: -0.113 },
  { latitude: 51.380, longitude: -0.114 }, // Purley Way
  { latitude: 51.377, longitude: -0.115 },
  { latitude: 51.374, longitude: -0.112 },
  { latitude: 51.371, longitude: -0.114 }, // Down Purley Way
];

export default function LiveScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.376,
          longitude: -0.114,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#007AFF" // Blue line
          strokeWidth={6}
        />
        {/* Mock marker at start */}
        <Marker coordinate={routeCoordinates[0]}>
          <View style={styles.markerContainer}>
            <Ionicons name="bus" size={16} color="#fff" />
            <Text style={styles.markerText}>Thornton Rd</Text>
          </View>
        </Marker>
        {/* Mock current location marker */}
        <Marker coordinate={routeCoordinates[routeCoordinates.length - 1]}>
          <View style={styles.navigationArrow}>
            <Ionicons name="navigate" size={32} color="#007AFF" />
          </View>
        </Marker>
      </MapView>

      {/* Header Overlay */}
      <SafeAreaView style={styles.headerContainer} edges={['top']}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </Pressable>
          <Text style={styles.headerTitle}>On Journey</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Bottom Sheet Overlay */}
      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        
        <View style={styles.stopInfoContainer}>
          <View style={styles.stopInfoLeft}>
            <Text style={styles.nextStopLabel}>Next Stop</Text>
            <Text style={styles.stopName}>Santacruz Station</Text>
            <Text style={styles.arrivingText}>Arriving in 3 min</Text>
          </View>
          
          <View style={styles.etaBox}>
            <Text style={styles.etaTime}>9:40</Text>
            <Text style={styles.etaLabel}>ETA</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>42 km/h</Text>
            <Text style={styles.statLabel}>Speed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Stops left</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>None</Text>
            <Text style={styles.statLabel}>Delay</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: width,
    height: height,
    position: 'absolute',
  },
  markerContainer: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  markerText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  navigationArrow: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(240, 248, 255, 0.95)', // slight blueish tint as per design
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A365D',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40, // extra padding for bottom tab bar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  stopInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  stopInfoLeft: {
    flex: 1,
  },
  nextStopLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  stopName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  arrivingText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#10B981', // green
  },
  etaBox: {
    backgroundColor: '#EBF8FF', // light blue
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  etaTime: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  etaLabel: {
    fontSize: 12,
    color: '#64748B',
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F1F5F9', // light gray/blue
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
});

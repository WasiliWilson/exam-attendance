import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', status: 'Active' },
    { id: 2, name: 'User 2', status: 'Active' },
    { id: 3, name: 'User 3', status: 'Active' },
    { id: 4, name: 'User 4', status: 'Active' },
    { id: 5, name: 'User 5', status: 'Active' },
  ]);

  const toggleStatus = (id: number) => {
    const user = users.find((user) => user.id === id);
    const newStatus = user?.status === 'Active' ? 'Deactivated' : 'Active';

    Alert.alert(
      `Confirm ${newStatus}`,
      `Are you sure you want to ${newStatus.toLowerCase()} this account?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: `${newStatus}`,
          style: 'destructive',
          onPress: () => {
            setUsers(users.map((user) =>
              user.id === id ? { ...user, status: newStatus } : user
            ));
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ADMIN</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>

      {/* Manage Accounts Section */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>MANAGE ACCOUNTS</Text>
        </TouchableOpacity>
      </View>

      {/* Table Section */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.headerCell]}>Accounts</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Status</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Actions</Text>
        </View>
        {users.map(user => (
          <View style={styles.tableRow} key={user.id}>
            <Text style={styles.tableCell}>{user.name}</Text>
            <Text
              style={[
                styles.tableCell,
                user.status === 'Deactivated' ? styles.deactivatedText : null,
              ]}
            >
              {user.status}
            </Text>
            <TouchableOpacity
              style={styles.deactivateButton}
              onPress={() => toggleStatus(user.id)}
            >
              <Text style={styles.deactivateText}>
                {user.status === 'Active' ? 'Deactivate' : 'Activate'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Placeholder Section */}
      <View style={styles.placeholder} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e6f0f9',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#003366',
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#0044cc',
    flex: 1,
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    marginTop: 10,
    backgroundColor: '#003366',
    borderRadius: 10,
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  deactivateButton: {
    flex: 1,
    backgroundColor: '#ffa500',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  deactivateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deactivatedText: {
    color: '#ff0000',
    fontStyle: 'italic',
  },
  placeholder: {
    backgroundColor: '#5b5b5b',
    height: 120,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default AdminDashboard;

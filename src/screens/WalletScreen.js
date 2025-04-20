import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomSafeArea from '../components/CustomSafeArea';

const WalletScreen = ({ navigation }) => {
  const transactions = [
    {
      date: 'Today',
      items: [
        { id: 1, description: 'Money Added to Wallet', amount: 500, balance: 12000, type: 'credit' },
      ],
    },
    {
      date: 'Yesterday',
      items: [
        { id: 2, description: 'Booking No #34234', amount: -500, balance: 11500, type: 'debit' },
      ],
    },
    {
      date: '22 September',
      items: [
        { id: 3, description: 'Refund for Booking #34234', amount: 500, balance: 12000, type: 'credit' },
        { id: 4, description: 'Booking #34234', amount: -500, balance: 11500, type: 'debit' },
        { id: 5, description: 'Booking #34234', amount: -500, balance: 11500, type: 'debit' },
      ],
    },
  ];

  const renderTransaction = (transaction) => (
    <View key={transaction.id} style={styles.transactionItem}>
      <Text style={styles.transactionDescription}>{transaction.description}</Text>
      <Text style={styles.transactionDate}>24 September | 7:30 AM</Text>
      <Text
        style={[
          styles.transactionAmount,
          transaction.type === 'credit' ? styles.credit : styles.debit,
        ]}
      >
        {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
      </Text>
      <Text style={styles.transactionBalance}>Balance ${transaction.balance.toFixed(2)}</Text>
    </View>
  );

  return (
    <CustomSafeArea>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wallet</Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Wallet Balance</Text>
        <Text style={styles.balanceAmount}>$ 12000.00</Text>
        <TouchableOpacity style={styles.addMoneyButton}>
          <Text style={styles.addMoneyButtonText}>Add Money</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {transactions.map((section) => (
          <View key={section.date} style={styles.transactionSection}>
            <Text style={styles.transactionDateHeader}>{section.date}</Text>
            {section.items.map(renderTransaction)}
          </View>
        ))}
      </ScrollView>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  balanceContainer: {
    backgroundColor: '#FFF5E5',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  addMoneyButton: {
    backgroundColor: '#FFB800',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  addMoneyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  transactionSection: {
    marginBottom: 24,
  },
  transactionDateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transactionItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  credit: {
    color: 'green',
  },
  debit: {
    color: 'red',
  },
  transactionBalance: {
    fontSize: 14,
    color: '#666',
  },
});

export default WalletScreen; 
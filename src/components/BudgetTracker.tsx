
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DollarSign, Plus, AlertTriangle } from 'lucide-react';
import { Expense } from '@/types/trip';

interface BudgetTrackerProps {
  budget: number;
  expenses: Expense[];
  onUpdateBudget: (budget: number) => void;
  onAddExpense: (expense: Expense) => void;
}

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({
  budget,
  expenses,
  onUpdateBudget,
  onAddExpense
}) => {
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Food',
    paidBy: ''
  });

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budget - totalSpent;
  const progressPercentage = budget > 0 ? (totalSpent / budget) * 100 : 0;
  const isOverBudget = totalSpent > budget;

  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.paidBy) {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: new Date().toISOString().split('T')[0],
        paidBy: newExpense.paidBy
      };
      onAddExpense(expense);
      setNewExpense({ description: '', amount: '', category: 'Food', paidBy: '' });
    }
  };

  const expenseCategories = ['Food', 'Accommodation', 'Transportation', 'Activities', 'Shopping', 'Other'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Budget Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="budget">Total Budget</Label>
          <Input
            id="budget"
            type="number"
            value={budget}
            onChange={(e) => onUpdateBudget(parseFloat(e.target.value) || 0)}
            placeholder="Enter total budget"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Spent: ${totalSpent.toFixed(2)}</span>
            <span className={remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}>
              Remaining: ${remainingBudget.toFixed(2)}
            </span>
          </div>
          <Progress value={Math.min(progressPercentage, 100)} className="w-full" />
        </div>

        {isOverBudget && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You're ${Math.abs(remainingBudget).toFixed(2)} over budget!
            </AlertDescription>
          </Alert>
        )}

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Add Expense</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="expense-desc">Description</Label>
              <Input
                id="expense-desc"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                placeholder="What did you spend on?"
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full p-2 border rounded-md"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              >
                {expenseCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="paid-by">Paid By</Label>
              <Input
                id="paid-by"
                value={newExpense.paidBy}
                onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
                placeholder="Who paid?"
              />
            </div>
          </div>
          <Button onClick={addExpense} className="w-full mt-3">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <span className="font-medium">{expense.description}</span>
                <div className="text-sm text-gray-600">
                  {expense.category} • {expense.paidBy} • {expense.date}
                </div>
              </div>
              <span className="font-bold">${expense.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

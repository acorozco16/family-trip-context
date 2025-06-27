
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { DollarSign, Plus, AlertTriangle, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
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

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budget - totalSpent;
  const progressPercentage = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;
  const isOverBudget = totalSpent > budget;
  const isNearBudget = progressPercentage > 80 && !isOverBudget;

  const validateExpense = () => {
    const errors: Record<string, string> = {};

    if (!newExpense.description.trim()) {
      errors.description = 'Description is required';
    } else if (newExpense.description.length < 3) {
      errors.description = 'Description must be at least 3 characters';
    }

    const amount = parseFloat(newExpense.amount);
    if (!newExpense.amount) {
      errors.amount = 'Amount is required';
    } else if (isNaN(amount) || amount <= 0) {
      errors.amount = 'Please enter a valid amount greater than 0';
    } else if (amount > 10000) {
      errors.amount = 'Amount seems unusually high. Please verify.';
    }

    if (!newExpense.paidBy.trim()) {
      errors.paidBy = 'Please specify who paid';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addExpense = async () => {
    if (!validateExpense()) return;

    setIsSubmitting(true);
    
    try {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description.trim(),
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: new Date().toISOString().split('T')[0],
        paidBy: newExpense.paidBy.trim()
      };

      onAddExpense(expense);
      setNewExpense({ description: '', amount: '', category: 'Food', paidBy: '' });
      setValidationErrors({});
      
      toast({
        title: "Expense added",
        description: `$${expense.amount.toFixed(2)} for ${expense.description}`,
      });
    } catch (error) {
      toast({
        title: "Error adding expense",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateBudget = (value: string) => {
    const budgetAmount = parseFloat(value) || 0;
    if (budgetAmount < 0) return;
    onUpdateBudget(budgetAmount);
  };

  const expenseCategories = ['Food', 'Accommodation', 'Transportation', 'Activities', 'Shopping', 'Emergency', 'Other'];

  const getCategoryIcon = (category: string) => {
    const icons = {
      Food: '🍽️',
      Accommodation: '🏨',
      Transportation: '🚗',
      Activities: '🎉',
      Shopping: '🛍️',
      Emergency: '🚨',
      Other: '📝'
    };
    return icons[category as keyof typeof icons] || '📝';
  };

  const getBudgetStatus = () => {
    if (isOverBudget) {
      return {
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        icon: <TrendingUp className="w-4 h-4 text-red-600" />,
        message: `$${Math.abs(remainingBudget).toFixed(2)} over budget`
      };
    } else if (isNearBudget) {
      return {
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        icon: <AlertTriangle className="w-4 h-4 text-yellow-600" />,
        message: `$${remainingBudget.toFixed(2)} remaining`
      };
    } else {
      return {
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: <TrendingDown className="w-4 h-4 text-green-600" />,
        message: `$${remainingBudget.toFixed(2)} remaining`
      };
    }
  };

  const budgetStatus = getBudgetStatus();

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Budget Tracker
          {expenses.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {expenses.length} expense{expenses.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Input */}
        <div>
          <Label htmlFor="budget" className="text-sm font-medium">
            Total Budget *
          </Label>
          <Input
            id="budget"
            type="number"
            min="0"
            step="0.01"
            value={budget}
            onChange={(e) => updateBudget(e.target.value)}
            placeholder="Enter your total budget"
            className="transition-all duration-200 focus:border-blue-500 text-lg font-semibold"
            aria-describedby="budget-help"
          />
          <p id="budget-help" className="text-xs text-gray-500 mt-1">
            Set your total trip budget to track expenses
          </p>
        </div>

        {/* Budget Overview */}
        {budget > 0 && (
          <div className={`p-4 rounded-lg border transition-all duration-200 ${budgetStatus.bgColor}`}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                {budgetStatus.icon}
                <span className="font-medium">Budget Status</span>
              </div>
              <span className={`font-bold ${budgetStatus.color}`}>
                {budgetStatus.message}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Spent: ${totalSpent.toFixed(2)}</span>
                <span>Budget: ${budget.toFixed(2)}</span>
              </div>
              <Progress 
                value={progressPercentage} 
                className={`w-full h-3 ${isOverBudget ? '[&>div]:bg-red-500' : isNearBudget ? '[&>div]:bg-yellow-500' : '[&>div]:bg-green-500'}`}
              />
              <div className="text-xs text-gray-600 text-center">
                {progressPercentage.toFixed(1)}% of budget used
              </div>
            </div>
          </div>
        )}

        {isOverBudget && (
          <Alert variant="destructive" className="animate-pulse">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Budget exceeded!</strong> You're ${Math.abs(remainingBudget).toFixed(2)} over your planned budget.
            </AlertDescription>
          </Alert>
        )}

        {/* Add Expense Form */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900">Add New Expense</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="expense-desc" className="text-sm font-medium">
                Description *
              </Label>
              <Input
                id="expense-desc"
                value={newExpense.description}
                onChange={(e) => {
                  setNewExpense({ ...newExpense, description: e.target.value });
                  if (validationErrors.description) {
                    setValidationErrors({ ...validationErrors, description: '' });
                  }
                }}
                placeholder="What did you spend money on?"
                className={`transition-all duration-200 ${
                  validationErrors.description ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'
                }`}
                aria-describedby={validationErrors.description ? "desc-error" : undefined}
                disabled={isSubmitting}
              />
              {validationErrors.description && (
                <p id="desc-error" className="text-red-500 text-sm mt-1" role="alert">
                  {validationErrors.description}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="amount" className="text-sm font-medium">
                Amount *
              </Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={newExpense.amount}
                onChange={(e) => {
                  setNewExpense({ ...newExpense, amount: e.target.value });
                  if (validationErrors.amount) {
                    setValidationErrors({ ...validationErrors, amount: '' });
                  }
                }}
                placeholder="0.00"
                className={`transition-all duration-200 ${
                  validationErrors.amount ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'
                }`}
                aria-describedby={validationErrors.amount ? "amount-error" : undefined}
                disabled={isSubmitting}
              />
              {validationErrors.amount && (
                <p id="amount-error" className="text-red-500 text-sm mt-1" role="alert">
                  {validationErrors.amount}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <select
                id="category"
                className="w-full p-2 border rounded-md transition-all duration-200 focus:border-blue-500 disabled:opacity-50"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                disabled={isSubmitting}
              >
                {expenseCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {getCategoryIcon(cat)} {cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="paid-by" className="text-sm font-medium">
                Paid By *
              </Label>
              <Input
                id="paid-by"
                value={newExpense.paidBy}
                onChange={(e) => {
                  setNewExpense({ ...newExpense, paidBy: e.target.value });
                  if (validationErrors.paidBy) {
                    setValidationErrors({ ...validationErrors, paidBy: '' });
                  }
                }}
                placeholder="Who paid for this?"
                className={`transition-all duration-200 ${
                  validationErrors.paidBy ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'
                }`}
                aria-describedby={validationErrors.paidBy ? "paidby-error" : undefined}
                disabled={isSubmitting}
              />
              {validationErrors.paidBy && (
                <p id="paidby-error" className="text-red-500 text-sm mt-1" role="alert">
                  {validationErrors.paidBy}
                </p>
              )}
            </div>
          </div>
          
          <Button 
            onClick={addExpense} 
            className="w-full transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
            disabled={isSubmitting}
          >
            <Plus className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Adding...' : 'Add Expense'}
          </Button>
        </div>

        {/* Expenses List */}
        {expenses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium">No expenses recorded yet</p>
            <p className="text-sm">Add your first expense above to start tracking</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Recent Expenses ({expenses.length})</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {expenses.map((expense) => (
                <div 
                  key={expense.id} 
                  className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-sm group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{getCategoryIcon(expense.category)}</span>
                      <span className="font-medium text-gray-900">{expense.description}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {expense.category} • {expense.paidBy} • {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg">${expense.amount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

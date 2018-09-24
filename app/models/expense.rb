class Expense < ApplicationRecord
  belongs_to :event

 validates :name, presence: true
 validates :cost , numericality: { greater_than_or_equal_to: 1 }
 validates :quantity , numericality: { greater_than_or_equal_to: 1 }

  def total 
     return self.cost * self.quantity if self.cost && self.quantity
  end

end

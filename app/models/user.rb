class User < ApplicationRecord
  attr_accessor :tile
  has_secure_password
  validates :password, presence: true, if: Proc.new { |user| user.password.present? }, confirmation: true, on: :update
  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
if Role.count == 0
  ['super_admin', 'admin', 'staff', 'student', 'normal'].each do |role|
    Role.create(name: role)
  end
end

password1 = SecureRandom.hex
pp "password1: #{password1}"
user = User.create(email: 'vmarcetic@bytecode.hr', password: password1, confirmed_at: DateTime.now)
user.add_role :super_admin

password2 = SecureRandom.hex
pp "password2: #{password2}"
user = User.create(email: 'bsipek@bytecode.hr', password: password2, confirmed_at: DateTime.now)
user.add_role :super_admin

password3 = SecureRandom.hex
pp "password3: #{password3}"
user = User.create(email: 'hviher@bytecode.hr', password: password3, confirmed_at: DateTime.now)
user.add_role :super_admin


password4 = SecureRandom.hex
pp "password4: #{password4}"
user = User.create(email: 'max@cogent.lu', password: password4, confirmed_at: DateTime.now)
user.add_role :super_admin

#user = User.create(email: 'vadym@cogent.lu', password: password1, confirmed_at: DateTime.now, organization: org)

org = Organization.create(name: 'luxsb')
staff = User.create(email: 'prof@luxsb.lu', password: 'password', confirmed_at: DateTime.now, organization: org)
staff.add_role :staff

student = User.create(email: 'student@luxsb.lu', password: 'password', confirmed_at: DateTime.now, organization: org)
student.add_role :student

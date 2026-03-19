module ArrayToEnumHash
  extend ActiveSupport::Concern
  #a.reduce({}) {|acc, x| acc.update(x.to_sym => x.to_s)}
  def array_to_enum_hash(array)
    result = {}
    v = array.to_enum
    w = array.map {|v| v.to_sym }.to_enum
    loop do
      result[w.next] = v.next
    end
    result
  end
end
defmodule WormsInSpaceWeb.Api.Schema do
  use Absinthe.Schema


  query do
    field :worm_time_slots, non_null(list_of(:time_slot))  do
      resolve &Api.Resolvers.list/2
    end
  end

  mutation do
    field :worm_space_walk, :time_slot do
      arg :id, :id
      arg :alternate_time, :string

      resolve &Api.Resolvers.create/2
    end
  end

  object :time_slot do
    field :id, non_null(:id)
    field :start_time, non_null(:string)
  end
end

defmodule Api.Resolvers do

  @time_slots [
    %{id: 2, start_time: "2020-02-28T16:00:00.000Z"},
    %{id: 6, start_time: "2020-02-28T21:00:00.000Z"},
    %{id: 9, start_time: "2020-02-28T14:00:00.000Z"}
  ]
  def list(_args, _info) do
    {:ok, @time_slots}
  end

  def create(%{alternate_time: _alternate_time, id: _id}, _info) do
    {:error, %{message: "Bad input.", status: 404}}
  end

# TODO: validate ID does not already exist
  def create(%{alternate_time: alternate_time}, _info) do
    id = :rand.uniform(20)
    {:ok, %{id: id, start_time: alternate_time}}
  end

  def create(%{id: id}, _info) do
    Enum.filter(@time_slots, fn %{id: existing_id} ->
      existing_id == String.to_integer(id)
    end)
    |> case do
      [] -> {:error, %{message: "Not found", status: 400}}
      worm_space_walk -> {:ok, List.first(worm_space_walk)}
    end
  end
end

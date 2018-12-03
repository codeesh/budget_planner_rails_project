class GuestsController < ApplicationController
  
  def new
    @guest.new
  end

  def create
    @guest = Guest.find(params[:guest][:id]) if params[:guest][:id] != ""
    if @guest == nil ||  @guest.name == ""
      @guest = Guest.new(guest_params)
      @guest.save
    end
    #render:text=>@guest.inspect
    @user_id = session[:user_id]
    @event_id = params[:event_id]
    Invitation.new(event_id: @event_id , guest_id: @guest.id).save
    if @guest[:name] == ""
      redirect_to user_event_path(@user_id,@event_id),:flash => { :message => "Please enter new name or pick from list" } 
    else
      redirect_to user_event_path(@user_id,@event_id)
    end
  end

  def show
    @guest = Guest.find(params[:id])
    @events = @guest.events
  end

  def index
    @guests = Guest.ordered_by_name
  end

  private

  def guest_params
    params.require(:guest).permit(:name)
  end

end
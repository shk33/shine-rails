class CustomersController < ApplicationController
  PAG_SIZE = 10

  def index
    @page = (params[:page] || 0).to_i
    if params[:keywords].present?
      @keywords = params[:keywords]
      customer_search_term = CustomerSearchTerm.new @keywords
      @customers = Customer.where(
          customer_search_term.where_clause,
          customer_search_term.where_args).
          order(customer_search_term.order).
          offset(PAG_SIZE*@page).limit(PAG_SIZE)
    else
      @customers = []
    end

    respond_to do |format|
      format.html {}
      format.json { render json: @customers}  
    end
  end

  def show
    customer = CustomerDetail.find params[:id]
    respond_to do |format|
      format.json { render json: customer}  
    end
  end

  def update
    customer_detail = CustomerDetail.find params[:id]
    customer_detail.update params
    head :ok
  end
end

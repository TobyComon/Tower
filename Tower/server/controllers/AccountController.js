import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { ticketsService } from '../services/TicketsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getTicketsByAccountId)
      .put('', this.editAccount)
  }
  async editAccount(req, res, next) {
    try {
      req.body.id = req.userInfo.id
      const updatedAccount = await accountService.updateAccount(req.userInfo, req.body)
      res.send(updatedAccount)
    } catch (error) {
      next(error)
    }
  }
  async getTicketsByAccountId(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const tickets = await ticketsService.getTicketsByAccountId(req.userInfo.id)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}

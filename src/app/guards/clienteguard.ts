import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ClienteService } from "../services/cliente.service";

@Injectable()
export class ClienteGuard implements CanActivate {

    constructor(private router: Router, private clienteService: ClienteService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.clienteService.getCliente()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/cliente'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
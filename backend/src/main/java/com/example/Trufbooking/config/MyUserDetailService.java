package com.example.Trufbooking.config;

import com.example.Trufbooking.entity.usertable;
import com.example.Trufbooking.repository.userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {


   private final userrepository userrepo;

    public MyUserDetailService(userrepository userrepo) {
        this.userrepo = userrepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       usertable user = userrepo.findByUsername(username);
       if(user == null){
           throw new UsernameNotFoundException(username);
       }
       return new UserPrincipal(user);
    }
}

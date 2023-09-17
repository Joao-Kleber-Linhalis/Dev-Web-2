package com.jk.BackEndLocadora.controller;

import com.jk.BackEndLocadora.service.LocacaoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping(value = "api/locacoes")
public class LocacaoController {

    @Autowired
    private LocacaoService locacaoService;
}
package com.jk.BackEndLocadora.service;

import com.jk.BackEndLocadora.domain.Diretor;
import com.jk.BackEndLocadora.domain.Item;
import com.jk.BackEndLocadora.domain.dto.DiretorDTO;
import com.jk.BackEndLocadora.domain.dto.ItemDTO;
import com.jk.BackEndLocadora.domain.enums.StatusItem;
import com.jk.BackEndLocadora.exceptions.ObjectNotFoundException;
import com.jk.BackEndLocadora.repository.DiretorRepository;
import com.jk.BackEndLocadora.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private TituloService tituloService;

    ModelMapper modelMapper = new ModelMapper();
    public ItemDTO findById(Long id) {
        Optional<Item> item = itemRepository.findById(id);
        return converterOptionalItemParaDTO(item).orElseThrow(() -> new ObjectNotFoundException(findByIdDisable(id) + " Id:" + id));
    }

    public ItemDTO findByIdDisponivel(Long id) {
        Optional<Item> item = itemRepository.findByIdAndStatusItemAndAtivo(id,StatusItem.DISPONIVEL,true);
        return converterOptionalItemParaDTO(item).orElseThrow(() -> new ObjectNotFoundException("Item Alugado ou Inexistente"));
    }

    public List<ItemDTO> findAllByStatus(Boolean status){
        List<Item> itemList = itemRepository.findByStatus(status);
        return itemList.stream().map(item-> modelMapper.map(item, ItemDTO.class)).collect(Collectors.toList());
    }

    public ItemDTO create(ItemDTO itemDTO){
        tituloService.findById(itemDTO.getTitulo().getId());
        Optional<Item> item = itemRepository.findBynumSerie(itemDTO.getNumSerie());
        if (item.isPresent() && !itemDTO.getTitulo().equals(item.get().getTitulo())) {
            throw new DataIntegrityViolationException("Número de Série: " + item.get().getNumSerie() + " pertence ao filme '" + item.get().getTitulo().getNome() + "'");
        }
        if(itemDTO.getDtAquisicao() == null){
            itemDTO.setDtAquisicao(new Date());
        }
        if(itemDTO.getStatusItem() == null){
            itemDTO.setStatusItem(StatusItem.DISPONIVEL);
        }
        return modelMapper.map(itemRepository.save(modelMapper.map(itemDTO, Item.class)), ItemDTO.class);
    }

    public ItemDTO update(Long id, ItemDTO itemDTO) {
        itemDTO.setId(id);
        findById(id);
        return modelMapper.map(itemRepository.save(modelMapper.map(itemDTO, Item.class)), ItemDTO.class);
    }

    public ItemDTO changeAtivo(Long id){
        Item item = modelMapper.map(findById(id), Item.class);
        item.setAtivo(!item.getAtivo());
        return modelMapper.map(itemRepository.save(item), ItemDTO.class);
    }

    private Optional<ItemDTO> converterOptionalItemParaDTO(Optional<Item> optionalItem) {
        return optionalItem.map(item -> modelMapper.map(item, ItemDTO.class));
    }

    private String findByIdDisable(Long id) {
        Optional<Item> item = itemRepository.findByIdAndAtivo(id, false);
        if (item.isPresent()) {
            return "Item atualmente desativado";
        } else {
            return "Item não encontrado";
        }
    }


}

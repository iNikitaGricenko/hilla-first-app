package com.example.application.mapper;

import com.example.application.models.Cpu;
import com.example.application.models.CpuFullDTO;
import com.example.application.models.CpuResponseDTO;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface CpuMapper {
    CpuResponseDTO toCpuResponseDTO(Cpu cpu);

    Cpu toCpu(CpuFullDTO dto);

    List<CpuResponseDTO> toCpuResponseListDTO(List<Cpu> cpus);

    List<Cpu> toCpuList(List<CpuFullDTO> dtos);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Cpu partialUpdate(@MappingTarget Cpu toBeUpdated,  Cpu cpu);
}

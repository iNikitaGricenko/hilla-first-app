package com.example.application.endpoints.cpu;

import com.example.application.mapper.CpuMapper;
import com.example.application.models.CpuFullDTO;
import com.example.application.models.CpuResponseDTO;
import com.example.application.service.CpuService;
import com.example.application.wrapper.RestPage;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import dev.hilla.Nullable;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class CpuRestEndpoint {

    private final CpuService cpuService;
    private final CpuMapper cpuMapper;

    @Nonnull
    public CpuResponseDTO getCpuById(@PathVariable("id") Long id) {
        return cpuMapper.toCpuResponseDTO(cpuService.findById(id));
    }

    @Nonnull
    public Page<CpuResponseDTO> getCpus(@Nullable Pageable pageable) {
        return new RestPage<>(cpuService.findAll(pageable).map(cpuMapper::toCpuResponseDTO));
    }

    @Nonnull
    public Long addCpu(@Valid @RequestBody CpuFullDTO cpu) {
        return cpuService.save(cpuMapper.toCpu(cpu));
    }

}

package com.example.application.service;

import com.example.application.models.Cpu;
import com.vaadin.flow.router.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CpuService {

	private final Map<Long, Cpu> fakeRepository = new HashMap<Long, Cpu>();
	private static long defaultId = 0;

	public Cpu findById(Long id) {
		return Optional.ofNullable(fakeRepository.get(id))
				.orElseThrow(NotFoundException::new);
	}

	public Page<Cpu> findAll(Pageable pageable) {
		Collection<Cpu> values = fakeRepository.values();
		return new PageImpl<>(new ArrayList<>(values), pageable, values.size());
	}

	public Long save(Cpu cpu) {
		cpu.setId(++defaultId);
		fakeRepository.put(defaultId, cpu);
		return defaultId;
	}
}
